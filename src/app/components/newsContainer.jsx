import React from 'react';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const NewsContainer = React.createClass({
  render() {
    return (
      <div>
        <h2 style={styles.headline}>Tab One Template Example</h2>
        <p>
          This is an example of a tab template!
        </p>
        <p>
          You can put any sort of HTML or react component in here. It even keeps the component state!
        </p>
      </div>
    );
  },
});

export default NewsContainer;
