import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';

export default class CHIP8Keypad extends React.Component
{
    static propTypes = {
        onKeyPress: PropTypes.func.isRequired,
        onKeyRelease: PropTypes.func.isRequired
    };

    static defaultProps = {
        onKeyPress: () => {},
        onKeyRelease: () => {}
    };

    keypadkeys = [
        [
            {mainText: '1', index: 1},
            {mainText: '2', index: 2},
            {mainText: '3', index: 3},
            {mainText: 'C', index: 12},
        ],
        [
            {mainText: '4', index: 4},
            {mainText: '5', index: 5},
            {mainText: '6', index: 6},
            {mainText: 'D', index: 13},
        ],
        [
            {mainText: '7', index: 7},
            {mainText: '8', index: 8},
            {mainText: '9', index: 9},
            {mainText: 'E', index: 14},
        ],
        [
            {mainText: 'A', index: 10},
            {mainText: '0', index: 0},
            {mainText: 'B', index: 11},
            {mainText: 'F', index: 15},
        ]
    ];

    constructor(props) {
        super(props);
    }

    onPress(key) {
        if ((key < 0) || (key >= 16)) {
            return;
        }

        this.props.onKeyPress(key);
    }

    onRelease(key) {
        if ((key < 0) || (key >= 16)) {
            return;
        }

        this.props.onKeyRelease(key);
    }

    renderKey(key, index) {

        return (
            <TouchableHighlight
                key={index}
                underlayColor={'#000'}
                style={keyStyle.wrapper}
                onPressIn={this.onPress.bind(this, key.index)}
                onPressOut={this.onRelease.bind(this, key.index)}
                >
                <View style={[keyStyle.bd]}>
                    <Text style={keyStyle.mainText}>{key.mainText}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    renderKeys() {
        return (
            this.keypadkeys.map((group, groupIndex) => {
                return (
                    <View key={groupIndex} style={styles.row}>
                        {group.map(this.renderKey.bind(this))}
                    </View>
                )
            })
        );
    }

    render() {
        const props = this.props;

        return (
            <View style={styles.wrapper}>
                <View style={styles.main}>
                    {this.renderKeys()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        backgroundColor: '#f4f4f4'
    },
    
    main: {
        flex: 1,
        alignSelf: 'flex-end'
    },

    row: {
        flexDirection: 'row'
    }
});

const keyStyle = StyleSheet.create({
    wrapper: {
        flex: 1,
        height: 96,
        backgroundColor: '#111'
    },
    
    bd: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#a5a5a5'
    },

    mainText: {
        fontSize: 32,
        color: '#fff'
    }
})