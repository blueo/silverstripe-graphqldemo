import React from 'react';
import Form from './form';

function Home() {
    return (
      <section className="container">
        <h1>Graphql Upload Demo</h1>
        <article className="row">
          <div className="col-sm-6 offset-sm-3">
            <Form/>
          </div>
        </article>
      </section>
    );
};
export default Home;
