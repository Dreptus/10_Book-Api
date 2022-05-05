const formatFullname = require('../formatFullname.js');
const expect = require('chai').expect;

describe('formatFullname', () => {
  it('should return an error if "fullName" arg is not a string', () => {
    expect(formatFullname(undefined)).to.equal('Error');
    expect(formatFullname(12)).to.equal('Error');
    expect(formatFullname({})).to.equal('Error');
    expect(formatFullname([])).to.equal('Error');
  });
  it('should return an error if "fullName" doesn\'t contain exactly two words', () => {
    expect(formatFullname('undefined')).to.equal('Error');
    expect(formatFullname('un de fined')).to.equal('Error');
  });
  it('should work correctly', () => {
    expect(formatFullname('Ada Kowalska')).to.equal('Ada Kowalska');
    expect(formatFullname('AdA KOWAlskA')).to.equal('Ada Kowalska');
    expect(formatFullname('aDA kOWALSKA')).to.equal('Ada Kowalska');
  });
  it('should return an error if "fullName" did not provided', () => {
    expect(formatFullname()).to.equal('Error');
  });
});
