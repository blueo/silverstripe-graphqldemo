import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {graphql} from 'react-apollo';
import {compose} from 'redux';
import FileField from './lib/fields/file';
import gql from 'graphql-tag';

function Form({handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fileName">File Name</label>
        <Field className="form-control" name="fileName" component="input" type="text"/>
      </div>
      <div className="form-group">
        <label htmlFor="upload">Upload</label>
        <Field className="form-control" name="upload" component={FileField}/>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

const uploadMutation = gql`
mutation uploadMutation {
  updateExhibit(data:$data) {
    data {
      ...exhibitInfo
    },
    errors {key, message}
  }
}
`;

const enhanced = compose(
  graphql(uploadMutation, {
    props: ({mutate}) => ({
      submit: (data) => {
        return mutate({
          variables: formatData(data),
          fragments: [exhibitInfoFragment, sharepointFileInfoFragment, locationInfoFragment],
          updateQueries: {
            exhibitQuery: (prev, {mutationResult, queryVariables}) => {
              const updateExhibit = get(mutationResult, 'data.updateExhibit.data');
              const {id} = updateExhibit;
              if (updateExhibit && id) {
                return  {...prev, exhibit: updateExhibit};
              }
              return prev;
            }
          }
        })
        .then((resp) => {
          const {data, errors} = resp.data.updateExhibit;
          if (errors && errors.length) {
            throw new SubmissionError(parseErrors(errors));
          }
          return data;
        });
      }
    })
  }),
  reduxForm({form: 'upload'})
);

export default enhanced(Form);
