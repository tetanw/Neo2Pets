import React, { Component } from 'react';
import { MainLayout } from '../../layout/main/main';

export class HomePage extends Component {
  render() {

    return (
      <MainLayout style={{marginTop: '50px'}}>
        <p> Hello World. </p>
      </MainLayout>
    );
  }
}