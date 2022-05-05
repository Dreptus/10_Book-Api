const cutText = require('../cutText.js');
const expect = require('chai').expect;

describe('CutText', () => {
  it('should return an error if "content" arg is not a string', () => {
    expect(cutText(undefined, 20)).to.equal('Error');
    expect(cutText(12, 20)).to.equal('Error');
    expect(cutText({}, 20)).to.equal('Error');
    expect(cutText([], 20)).to.equal('Error');
  });
  it('should return an error if "content" arg length is 0', () => {
    expect(cutText('', 20)).to.equal('Error');
  });
  it('should return an error if "maxLength" arg is not a number', () => {
    expect(cutText('Lorem Ipsum', undefined)).to.equal('Error');
    expect(cutText('Lorem Ipsum', 'abc')).to.equal('Error');
    expect(cutText('Lorem Ipsum', {})).to.equal('Error');
    expect(cutText('Lorem Ipsum', [])).to.equal('Error');
    expect(cutText('Lorem Ipsum', function () {})).to.equal('Error');
  });
  it('should return an error if "maxLength" is lower or equal 0', () => {
    expect(cutText('Lorem Ipsum', 0)).to.equal('Error');
    expect(cutText('Lorem Ipsum', -6)).to.equal('Error');
  });
  it('should return "content" without changes if proper args', () => {
    expect(cutText('Lorem Ipsum', 40)).to.equal('Lorem Ipsum');
    expect(cutText('Lorem Ipsum', 11)).to.equal('Lorem Ipsum');
  });
  it('should return good cut "content" if proper args', () => {
    expect(cutText('Lorem Ipsum dolor sit amet', 14)).to.equal(
      'Lorem Ipsum...'
    );
    expect(cutText('Lorem Ipsum dolor sit amet', 5)).to.equal('Lorem...');
    expect(cutText('Lorem Ipsum dolor sit amet', 17)).to.equal(
      'Lorem Ipsum dolor...'
    );
  });
});
