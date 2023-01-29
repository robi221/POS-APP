import React, { Component } from 'react'
import { Row, Col, Container } from "react-bootstrap";
import {Hasil, ListCategories, NavbarComponent, Menus} from "./components"
import { API_URL } from './utils/constants'
import axios from 'axios'

// menggunakan class komponen karna membutuhkan state dan props
export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: [],
       categoriYangDipilih: 'Makanan'
  }
}

// mengamnbil data dari server dan menyimpannya ke dalam state untuk digunakan pada component
componentDidMount() {
   axios
   .get(API_URL+"products?category.nama="+this.state.categoriYangDipilih)
   .then(res => {
    // console.log("Response : ", res);
    const menus = res.data;
    this.setState({ menus })
   })
   .catch(error=> {
    console.log(error)
   })
}


// Membuat component category dinamis
changeChategory = (value) => {
  this.setState({
    categoriYangDipilih : value,
  menus: []
})
axios
   .get(API_URL+"products?category.nama="+value)
   .then(res => {
    // console.log("Response : ", res);
    const menus = res.data;
    this.setState({ menus })
   })
   .catch(error=> {
    console.log(error)
   })
}



  render() {
    // console.log(this.state.menus)
    const { menus, categoriYangDipilih } = this.state
    return (
      <div className="App">
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeChategory} categoriYangDipilih={categoriYangDipilih} />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                  {menus && menus.map((menu) => (
                    <Menus 
                      key={menu.id}
                      menu={menu}
                    />
                  ))} 
              </Row>
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    </div>
    )
  }
}
