const expect = require('chai').use(require('dirty-chai')).expect;
const r = require('..');
const expectedRegularFolder = {file1: 'export 1', file2: 'export 2', file3: 'export 3'};
const expectedDifferentExtensions = {file1: 'export 1', file2: 'export 2'};
const expectedOverlappingNames = {'file1.js': 'export 1 .js', 'file1.json': 'export 1 .json', file2: 'export 2'};
describe('entire-folder', () => {
  it('requires all .js files in a folder', () => {
    expect(r('./regularFolder')).to.eql(expectedRegularFolder);
  });
  it('also requires .json and files', () => {
    expect(r('./differentExtensions')).to.eql(expectedDifferentExtensions);
  });
  it('includes file extensions if the filenames alone are ambiguous', () => {
    expect(r('./overlappingNames')).to.eql(expectedOverlappingNames);
  });
  it('allows absolute paths to directories', () => {
    expect(r(`${__dirname}/regularFolder`)).to.eql(expectedRegularFolder);
  });
  it('ignores files that have non-module extensions', () => {
    expect(r('./irrelevantFiletypes')).to.eql(expectedRegularFolder);
  });
  it('allows the . prefix to be omitted', () => {
    expect(r('regularFolder')).to.eql(expectedRegularFolder);
  });
  it('correctly handles paths when called from the repl', done => {
    const input = new (require('stream')).Readable();
    input._read = () => {};
    const output = new (require('stream')).Writable();
    output._write = (chunk, encoding, callback) => {
      const result = chunk.toString('utf8');
      if (result) {
        try {
          expect(result).to.equal(`${JSON.stringify(expectedRegularFolder)}\n`);
          done();
        } catch (err) {
          done(err);
        }
      }
      callback(null, result);
    };
    input.push('require("..")("./regularFolder")\n');
    require('repl').start({input, output, prompt: '', writer: JSON.stringify});
  });
});
