import ApolloClient from 'apollo-client';
import createNetworkInterface from 'apollo-upload-network-interface';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  credentials: 'same-origin'
});

export default new ApolloClient({
  networkInterface,
  dataIdFromObject: o => {
    if (o.__typename && o.id) {
      return o.__typename + '__' + o.id;
    }
    return undefined;
  }
});
