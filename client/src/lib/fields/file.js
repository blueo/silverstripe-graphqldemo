import React from 'react';

function _onChange(onChange) {
  return  (e) => onChange(e.target.files);
}

function FileField({input, meta:{error}, label, ...props}) {

  return (
    <span>
      <input onChange={_onChange(input.onChange)} type="file" {...props} />
      {error && <span>{error}</span>}
    </span>
  );
}

FileField.defaultProps = {
  meta: {}
};

export default FileField;
