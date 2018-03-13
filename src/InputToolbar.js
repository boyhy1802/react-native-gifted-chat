import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ViewPropTypes,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';

import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';
const { width, height } = Dimensions.get('window')
export default class InputToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 'absolute'
    };
  }

  componentWillMount () {
    this.keyboardWillShowListener =
      Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener =
      Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow = () => {
    this.setState({
      position: 'relative'
    });
  }

  _keyboardWillHide = () => {
    this.setState({
      position: 'absolute'
    });
  }

  renderActions() {
    if (this.props.renderActions) {
      return this.props.renderActions(this.props);
    } else if (this.props.onPressActionButton) {
      return <Actions {...this.props} />;
    }
    return null;
  }

  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <Send {...this.props}/>;
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return (
      <Composer
        {...this.props}
      />
    );
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View
        style={[styles.container, this.props.containerStyle, { position: this.state.position },
          { bottom: Platform.OS === 'ios' ? (this.state.background && this.props.background ? 65 : 10) : 0 }]}>
        <Image
          style={{width,
              position: 'absolute'}}
          source={require('../../../assets/images/bg_tutorial.png')} />
        <View style={[styles.primary, this.props.primaryStyle]}>
          <Image
            style={{marginBottom: 8, marginRight: 10}}
            source={require('../../../assets/images/ic_menu_large.png')} />
          {this.renderActions()}
          {this.renderComposer()}
          {this.renderSend()}
          <TouchableOpacity
            onPress={this.props.record}
          >
            <Image
              style={{width: 36, height: 36, marginLeft: 10}}
              source={require('../../../assets/images/ic_record.png')} />
          </TouchableOpacity>
        </View>
        {this.renderAccessory()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#b2b2b2',
    backgroundColor: '#FFFFFF',
    bottom: 0,
    width: Dimensions.get('window').width
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin:7
  },
  accessory: {
    height: 44,
  },
});

InputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
  record: null,
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {},
};

InputToolbar.propTypes = {
  record: PropTypes.func,
  renderAccessory: PropTypes.func,
  renderActions: PropTypes.func,
  renderSend: PropTypes.func,
  renderComposer: PropTypes.func,
  onPressActionButton: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  primaryStyle: ViewPropTypes.style,
  accessoryStyle: ViewPropTypes.style,
};
