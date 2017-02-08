'use strict';
import React, {Component} from 'react';
import Add from './components/add'
import Home from './components/home'

import {
    StyleSheet,
    Text,
    View,
    Image,
    TabBarIOS,
    TouchableOpacity,
    AlertIOS,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class app extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        this.state = {
            selectedTab: 'Add',
        };
    }

    render() {
        return (
            <TabBarIOS
                tintColor="black"
                barTintColor="#3abeff">
                <Icon.TabBarItemIOS
                    title="首页"
                    iconName="ios-home-outline"
                    selectedIconName="ios-home"
                    iconColor="#fff"
                    selectedIconColor="#fff"
                    selected={this.state.selectedTab === 'Home'}
                    onPress={() => {
            this.setState({
              selectedTab: 'Home',
            });
          }}>
                    <Home/>
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    title="新衣服"
                    iconName="ios-shirt-outline"
                    selectedIconName="ios-shirt"
                    iconColor="#ffffff"
                    selectedIconColor="#fff"
                    selected={this.state.selectedTab === 'Add'}
                    renderAsOriginal={true}
                    onPress={() => {
            this.setState({
              selectedTab: 'Add',
            });
          }}>
                    <Add/>
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
    }
}

