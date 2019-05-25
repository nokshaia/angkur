import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {getCookie, setCookie} from "./utility/UtilityFunc";
import Language from "./context/Language";
import LocalizedStrings from 'react-localization';
import Home from "./pages/Home/Home";
import Navbar from "./components/Nav/Navbar";
import FontPage from "./pages/FontPage/FontPage";


const lang = new LocalizedStrings({
   bn: {
      title: 'অংকুর - বাংলা ওয়েব ফন্ট'
   }, en: {
      title: 'Angkur - Bangla Web Font'
   },

});


class App extends Component {


   constructor(props) {
      super(props);
      let lang = getCookie('lang') ? getCookie('lang') : 'bn';
      this.state = {
         lang: lang
      }
   }


   changeLang = (lang) => {
      console.log(`[App.js] Current Language is ${this.state.lang}`);

      this.setState({
         lang: lang
      });
   };


   render() {
      return (
          <Router>
             <div>
                <Switch>
                   {/*  For Routes with EN or BN   */}
                   <Route path="/:lang(en|bn)/:q*/" component={
                      props => {

                         let langID = props.match.params['lang'];
                         lang.setLanguage(props.match.params['lang']);
                         document.title = lang.title;

                         setCookie('lang', props.match.params['lang']);
                         return (
                             <Language.Provider value={{lang: props.match.params['lang'], changeLang: this.changeLang}}>
                                <Switch>
                                   <Route exact path={[`/${langID}`, `/${langID}/`]} component={props => <Home/>}/>
                                   <Route exact path={[`/${langID}/about`, `/${langID}/about/`]}
                                          component={props => <Navbar/>}/>

                                   <Route exact path={[`/${langID}/font`, `/${langID}/font/`]}
                                          component={props => <FontPage/>}/>
                                </Switch>
                             </Language.Provider>
                         );
                      }
                   }/>

                   {/*  For Routes without EN or BN, redirect them to EN/BN   */}
                   <Route path="/:q(.*)" component={
                      props => {
                         console.log('nothing detected');
                         let lang = getCookie('lang') ? getCookie('lang') : 'bn';
                         return <Redirect to={`/${lang}${props.location.pathname}`}/>;
                      }
                   }/>
                </Switch>
             </div>
          </Router>
      );
   }
}

const Test = (props) => {
   return <h1>Test</h1>
};

export default App;