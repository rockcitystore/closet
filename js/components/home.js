/**
 * Created by root on 2017/2/2.
 */
import React, {Component} from 'react';

import {Screen, Row, View, Icon, DropDownMenu, Text, TextInput, NavigationBar, Title, Button} from '@shoutem/ui'

const styles = {
    v: {
        marginTop: 70
    },
};
export default class home extends Component {
    render() {
        return (
            <Screen>
                <NavigationBar
                    leftComponent={
                 <Button
                onPress={() => {
                alert('hehe')
              }}
                styleName="clear">
      <Text>菜单</Text>
    </Button>
                }
                    centerComponent={<Title>首页</Title>}
                />

                <View style={styles.v}>
                    <Text>首页</Text>

                </View>

            </Screen>
        )
    }

}