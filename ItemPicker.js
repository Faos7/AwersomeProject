import React, {Component} from 'react';
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body,
    Left, Picker, Form, Item as FormItem } from 'native-base';
import {Platform} from 'react-native';

const Item = Picker.Item;

const apple = Platform.select({
    ios: true,
    android: false
});


export default class ItemPicker extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected1: 'key1'
        };
    }

    onValueChange (value: string){
        this.setState({
            selected1 : value
        });
    }


    render(){
        return(
            <Container>
                <Header visible = {apple}>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Picker</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Picker
                            iosHeader="Select One"
                            mode='dropdown'
                            selectedValue={this.state.selected1}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Item label='Cats' value='key0' />
                            <Item label='Dogs' value='key1'/>
                            <Item label='Birds' value='key2'/>
                            <Item label='Elephants' value='key3'/>
                        </Picker>
                    </Form>
                </Content>
            </Container>
        );
    }
}