import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import request from 'superagent';


const CLOUDINARY_UPLOAD_PRESET = 'wgncshp5';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mouire/upload';

export class Avatar extends Component {
    state = {
      disableDrop: false,
      imageUrl: this.props.src,
    }

    onImageDrop = (files) => {
      this.setState({
        imageUrl: files[0].preview,
        disableDrop: true,
      });
      this.onSave(file)
    }

    onSave = (file) => request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', this.state.file)
      .then((response) => {
        response.body.secure_url !== '' && this.setState({
          imageUrl: response.body.secure_url,
        });
        this.props.onChange(response.body.secure_url)
      })

    render() {
      const { onImageDrop } = this,
        { disableDrop, imageUrl } = this.state;

      return (<Dropzone
        onDrop={onImageDrop}
        multiple={false}
        accept="image/*"
        disableClick={disableDrop}
      />)
    }
}

