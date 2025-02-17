import Fuse from '../lib/fuse.esm.min.js';

export default {
  tagName: 'search',
  computed: {
    classList() {
      return ['search', `${this.expanded ? 'search--expanded' : ''}`, 'vue-component'];
    },
    limitedResults() {
      return this.results?.slice(0, this.maxResults);
    },
  },
  data() {
    return {
      search: null,
      store: null,
      results: null,
      maxResults: 15,
    };
  },
  methods: {
    handleEnter() {
      const url = `${this.endpoint}`;

      if (!url) return;
      if (this.store) return this.handleSearch();

      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.store = data;

          this.handleSearch();
        })
        .catch((error) => {
          console.log('handleEnter ~ error', error);
        });
    },
    handleSearch() {
      if (!this.searchEngine) {
        this.initSearchEngine();
      }

      const searchTerm = `${this.$refs.search.value}`;

      if (!searchTerm) return; // TODO add an error

      this.results = this.searchEngine.search(searchTerm);
      console.log('handleSearch ~ this.results', this.results);
    },
    initSearchEngine() {
      const store = this.store;
      const { results, weights } = store;

      if (!Fuse) return;

      const options = {
        includeScore: true,
        ignoreLocation: true,
        findAllMatches: true,
        includeMatches: true,
        // ignoreFieldNorm: true, // discuss this param with caro
        threshold: 0.2,
        keys: weights,
      };

      this.searchEngine = new Fuse(results, options);
    },
  },
  props: {
    placeholder: String,
    endpoint: String,
    language: String,
  },
  template: `
    <div :class="classList">
      <input ref="search" type="search" @keypress.enter="handleEnter" />
      <div v-for="result in limitedResults">
        <div class="">
          <div>title: {{ result.item.title }}</div>
          <div>excerpt: {{ result.item.excerpt }}</div>
          <div>score: {{ result.score }}</div>
        </div>
        <br/><br/>
      </div>
    </div>
  `,
};
