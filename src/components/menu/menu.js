import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadProducts} from "../../redux/actions";

import Product from '../product';
import Basket from '../basket';

import styles from './menu.module.css';
import {productsLoadedSelector, productsLoadingSelector} from "../../redux/selectors";
import Loader from "../loader";

class Menu extends React.Component {
    static propTypes = {
        menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    };

    state = {error: null};

    componentDidCatch(error) {
        this.setState({error});
    }

    loadProductsIfNeeded = () => {
        const {loadProducts, restId, loading, loaded} = this.props;

        if (!loading && !loaded) {
            loadProducts(restId);
        }
    }

    componentDidMount() {
        this.loadProductsIfNeeded();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.restId !== this.props.restId) {
            this.loadProductsIfNeeded();
        }
    }

    render() {
        const {menu, loading} = this.props;

        if (loading) {
            return <Loader/>
        }

        if (this.state.error) {
            return <p>Сейчас меню этого ресторана недоступно :(</p>;
        }

        return (
            <div className={styles.menu}>
                <div>
                    {menu.map((id) => (
                        <Product key={id} id={id}/>
                    ))}
                </div>
                <div>
                    <Basket/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    loading: productsLoadingSelector(state, props),
    loaded: productsLoadedSelector(state, props),
})

const mapDispatchToProps = {loadProducts};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
