import React, {Component} from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {graphql} from 'react-apollo';
import {compose} from 'redux';
import FileField from './lib/fields/file';
import gql from 'graphql-tag';

class Form extends Component {
  constructor() {
    super();
    this._submitter = this._submitter.bind(this);
    this.state = {saved: false};
  }
  _submitter(data) {
    const {submitForm, reset} = this.props;
    const submitter = (data) => {
      return submitForm(data)
      .catch((err) => {
        if (err instanceof SubmissionError) {
          throw err;
        }

        console.log(err);//eslint-disable-line no-console
        throw new SubmissionError({_error: 'Error submiting form'});
      })
      .then(() => {
        reset();
        this.setState({
          saved: true
        });
      });
    };
    return submitter(data);
  };
  render () {
    const {handleSubmit, submitting} = this.props;
    const {saved} = this.state;
    return (
      <form onSubmit={handleSubmit(this._submitter)}>
        <div className="form-group">
          <label htmlFor="FileName">File Name</label>
          <Field className="form-control" name="FileName" component="input" type="text"/>
        </div>
        <div className="form-group">
          <label htmlFor="File">Upload</label>
          <Field className="form-control" name="File" component={FileField}/>
        </div>
        <button disabled={submitting} type="submit">Submit</button>
        {submitting && <p>Uploading file</p>}
        {saved && <p>File uploaded</p>}
      </form>
    );
  }
}

const uploadMutation = gql`
mutation uploadMutation($File: Upload!, $FileName: String) {
  uploadFileMutation(File: $File, Name: $FileName) {
    Name,
    Url
  }
}
`;

const enhanced = compose(
  graphql(uploadMutation, {
    props: ({mutate}) => ({
      submitForm: (data) => {
        return mutate({
          variables: data,
          // fragments: [exhibitInfoFragment, sharepointFileInfoFragment, locationInfoFragment],
          // updateQueries: {
          //   exhibitQuery: (prev, {mutationResult, queryVariables}) => {
          //     const updateExhibit = get(mutationResult, 'data.updateExhibit.data');
          //     const {id} = updateExhibit;
          //     if (updateExhibit && id) {
          //       return  {...prev, exhibit: updateExhibit};
          //     }
          //     return prev;
          //   }
          // }
        })
        .then((resp) => {
          const {data, errors} = resp.data.uploadFileMutation;
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
