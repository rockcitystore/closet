import React from 'react';

import { View, Text } from 'react-native';
import {Caption} from '@shoutem/ui';
function Stage({ title, children }) {
  return (
    <View style={styles.container}>
      {/*<Text style={styles.title}>{title}</Text>*/}
      <Caption styleName="h-center">{title}</Caption>
      <View style={styles.stage}>
        {children}
      </View>
    </View>
  );
}

Stage.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
};

const styles =  {
  container: {
    // marginVertical: 24,
    marginVertical: 12,
    flexDirection: 'column',
  },
  title: {
    fontSize: 22,
    color: '#444f6c',
    margin: 8,
    marginLeft: 16,
  },
  stage: {
    // paddingVertical: 40,
    paddingVertical: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#f5f6f7',
  },
};

export { Stage };
