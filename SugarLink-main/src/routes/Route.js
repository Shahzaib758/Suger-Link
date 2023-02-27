import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouteSwitch from './RouteSwitch';
import Home from '../views/Home'
import NotFound from '../views/NotFound'
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutMain from '../views/About';
import HowWorkMain from '../views/HowWork';
import Profiles from '../views/Profiles';
import SingleProfile from '../views/SingleProfile';
import Authentication from '../views/Authentication';

export const UserContext = createContext()

export default function AppRoute() {

    return (
        <div>
            <Router>
                <Header />
                <RouteSwitch>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route exact path="/auth" element={<Authentication />}></Route>
                    <Route exact path="/about" element={<AboutMain />}></Route>
                    <Route exact path="/how-it-works" element={<HowWorkMain />}></Route>
                    <Route exact path="/profiles" element={<Profiles />}></Route>
                    <Route exact path="/profile/:id" element={<SingleProfile />}></Route>
                    <Route exact path="*" element={<NotFound />}></Route>
                </RouteSwitch>
                <Footer />
            </Router>
        </div>
    )
}