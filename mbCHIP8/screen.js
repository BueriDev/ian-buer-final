import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Canvas from 'react-native-canvas';

export default class CHIP8Screen extends React.Component
{
    static propTypes = {
        onDraw: PropTypes.func.isRequired
    };

    static defaultProps = {
        onDraw: () => {}
    };

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState)
    {
        const { canvas } = this.state;
        this.onDraw(canvas);
    }

    onDraw(canvas)
    {
        this.props.onDraw(canvas);
    }

    handleCanvas = (canvas) => {
        if (canvas == null)
        {
            return;
        }

        canvas.width = 410;
        canvas.height = 205;

        const ctx = canvas.getContext('2d');
        // Approximate scale
        ctx.scale(6.4, 6.4);
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, 64, 32);
        

        this.setState({
            canvas: canvas,
        });
    }

    render() {
        return (
            <View style={styles.screen}>
                <Canvas ref={this.handleCanvas}></Canvas>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});