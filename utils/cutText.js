module.exports = (content, maxLength) => {
  //CONTENT
  if (typeof content !== 'string') return 'Error';
  //dlaczego to musi być pod tym pierwszym warunkiem a nie nad nim?
  if (content.length < 1) return 'Error';

  // MAXLENGTH
  if (typeof maxLength !== 'number') return 'Error';
  if (maxLength <= 0) return 'Error';
  //BOTH
  if (content.length <= maxLength) return content;

  //REST
  return content.substr(0, content.lastIndexOf(' ', maxLength)) + '...';
};
