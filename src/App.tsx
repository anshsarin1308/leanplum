import { Component, Vue } from 'vue-property-decorator';

import './App.scss';

@Component({name: "App"})
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <div id="nav">
          <router-link to="/home">Home</router-link>
        </div>
        <router-view/>
      </div>
    );
  }
}

