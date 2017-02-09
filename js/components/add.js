/**
 * Created by root on 2017/1/31.
 */
import React, {Component, Navigator} from 'react';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
import {
    // StyleSheet,
    // Text,
    // View,
    // Image,
    // NavigatorIOS,
    // TouchableOpacity,
    // ListView,
    // PickerIOS,
    DatePickerIOS,
    ScrollView,
} from 'react-native';
import {
    Screen,
    Row,
    View,
    Icon,
    DropDownMenu,
    Text,
    TextInput,
    NavigationBar,
    Title,
    Button,
    Divider,
    Caption,
    Image,
    Lightbox,
    Overlay,
    GridRow,
} from '@shoutem/ui'

import {Stage} from './Stage';

import {PickerIOS, Input, Dimensions} from 'react-native'
var PickerItemIOS = PickerIOS.Item;
import {get, upload} from '../services/fetch';
const window = Dimensions.get('window');
const styles = {
    mt: {
        marginTop: 70,
    },
    textInput: {
        fontSize: 14,
        textAlign: 'center',
        alignSelf: 'center',
        width: window.width * 0.718,
        backgroundColor: 'transparent',
    },
    takephoto: {
        color: '#fff'
    },
    datePickerIOS: {
        width: window.width * 0.718,

    }
};
const ImagePickerOptions = {
    title: '',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍张照片吧..',
    chooseFromLibraryButtonTitle: '从照片库选择..',
    // customButtons: [
    //     {name: 'fb', title: 'Choose Photo from Facebook'},
    // ],
    // storageOptions: {
    //     skipBackup: true,
    //     path: 'images'
    // }
};
import CameraRollPicker from 'react-native-camera-roll-picker';
let takePhoto = ()=> {

    // return <View>
    //     <Button
    //     onPress={
    //     ImagePicker.launchCamera(ImagePickerOptions, (response) => {
    //
    //     if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //     }
    //     else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     }
    //     else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //     }
    //     else {
    //         // You can display the image using either data...
    //         // response.uri = {uri: 'data:image/jpeg;base64,' + response.data};
    //
    //         // Or a reference to the platform specific asset location
    //         if (Platform.OS !== 'android') {
    //             response.uri = response.uri.replace('file://', '')
    //         }
    //         console.log(response);
    //         RCTDeviceEventEmitter.emit('photoSource', response);
    //     }
    // })
    //     }>相机</Button>
    //     <CameraRollPicker
    //         callback={this.getSelectedImages} />
    // </View>
    ImagePicker.showImagePicker(ImagePickerOptions, (response) => {

        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            // You can display the image using either data...
            // response.uri = {uri: 'data:image/jpeg;base64,' + response.data};

            // Or a reference to the platform specific asset location
            if (Platform.OS !== 'android') {
                response.uri = response.uri.replace('file://', '')
            }
            console.log(response);
            RCTDeviceEventEmitter.emit('photoSource', response);
        }
    })
}
let add = ()=> {

}

import {ImageGallery} from '../../node_modules/@shoutem/ui/index'
import {InlineGallery} from '../../node_modules/@shoutem/ui/index'


let iul = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1486353922719&di=3143b36e6e1af98408cadc3f5c7a365f&imgtype=0&src=http%3A%2F%2Fwww.wfnews.com.cn%2Findex%2Fattachement%2Fjpg%2Fsite1%2F20141030%2F001a6b4d011715bbf00034.jpg';

export default class clothingFile extends Component {

    fetchData(path) {
        get(path)
            .then((r) => {
                this.setState({
                    brands: r.brands
                    , types: r.types
                    , malls: r.malls
                    , selectedBrand: r.brands[0]
                    , selectedType: r.types[0]
                    , selectedMall: r.malls[0]
                });
            })
    }

    fetchCloth(path) {
        get(path)
            .then((r) => {
                this.setState({
                    price: r.price || null,
                    photoSource: r.photoUrl || []
                });
            })
    }

    constructor(props) {
        console.log('Add constructor()');
        super(props);
        this.state = {
            buy_time: new Date(),
            brands: [],
            types: [],
            malls: [],
            photoSource: [],
        };
    }

    componentWillMount() {
        console.log('Add componentWillMount');
        this.fetchData('server/brand');
        this.fetchCloth('server/clothing');
    }

    componentDidMount() {
        console.log('Add componentDidMount');
        RCTDeviceEventEmitter.addListener('photoSource', (o) => {
            let t = this.state.photoSource;
            //todo 新增图片自动现实
            t.unshift({source: {uri: o.uri}});
            this.setState({photoSource: t})
            console.log(this.state.photoSource);
            upload('server/upload/clothing', o)
                .then((r) => {
                    console.log('photo uploaded');
                })
        });
    }

    showImage() {
        if (this.state.photoSource.length > 0) {
            console.log(this.state.photoSource);
            return <ImageGallery
                data={this.state.photoSource}

                pageMargin={20}
            />
        } else {
            return <Image></Image>
        }
    }

    onTypesChange(value) {
        console.log(value);
        this.setState({
            selectedType: value,
        });
    }

    onBrandsChange(value) {
        console.log(value);
        this.setState({
            selectedBrand: value,
        });
    }

    onMallsChange(value) {
        this.setState({
            selectedMall: value,
        });
    }

    onDateChange(value) {
        this.setState({
            buy_time: value
        });
    }

    render() {

        return (
            <Screen>
                <NavigationBar
                    hasHistory
                    centerComponent={<Title>创建资料卡</Title>}
                    rightComponent={
                <Button
                styleName="confirmation dark"
                onPress={add}
                >
                 <Text>提交</Text>
                </Button>
                }
                />

                <ScrollView style={[styles.mt,{paddingBottom:300,backgroundColor:'#666'}]}>
                    <Overlay styleName="solid-bright" style={{height:400,backgroundColor:'#f66'}}
                    >
                        {this.showImage()}
                        <Button
                            styleName="dark"
                            onPress={takePhoto}
                        ><Icon name="add-event"/><Text style={styles.takephoto}>拍张照片</Text></Button>
                    </Overlay>

                    <View style={{paddingTop:200,paddingBottom:300}}>
                        <Stage title="昵称">
                            <TextInput
                                style={styles.textInput}
                                maxLength={20}
                                clearButtonMode="while-editing"
                                placeholder="小黑裙.."
                            />
                        </Stage>
                        <Stage title="价格">
                            <TextInput
                                style={styles.textInput}
                                maxLength={10}
                                value={this.state.price}
                                clearButtonMode="while-editing"
                                placeholder="88.88"
                                keyboardType="numeric"
                            />
                        </Stage>

                        <Stage title="品牌">
                            <DropDownMenu
                                styleName="horizontal"
                                options={this.state.brands}
                                selectedOption={this.state.selectedBrand}
                                onOptionSelected={this.onBrandsChange.bind(this)}
                                titleProperty={"name"}
                                valueProperty={"id"}
                                visibleOptions={6}
                            />
                        </Stage>

                        <Stage title="类型">
                            <DropDownMenu
                                styleName="horizontal"
                                options={this.state.types}
                                selectedOption={this.state.selectedType}
                                onOptionSelected={this.onBrandsChange.bind(this)}
                                titleProperty={"name"}
                                valueProperty={"id"}
                                visibleOptions={6}
                            />
                        </Stage>
                        <Stage title="购买地点">
                            <DropDownMenu
                                styleName="horizontal"
                                options={this.state.malls}
                                selectedOption={this.state.selectedMall}
                                onOptionSelected={this.onMallsChange.bind(this)}
                                titleProperty={"name"}
                                valueProperty={"id"}
                                visibleOptions={6}
                            />
                        </Stage>
                        <Stage title="购买日期">
                            <DatePickerIOS
                                date={this.state.buy_time}
                                mode="date"
                                onDateChange={this.onDateChange.bind(this)}
                                style={styles.datePickerIOS}
                            />
                        </Stage>
                    </View>
                </ScrollView>
            </Screen>



        );
    }
}