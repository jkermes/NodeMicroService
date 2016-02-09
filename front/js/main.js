import React from 'react'
import { render } from 'react-dom'

var serverUrl = 'http://localhost:9312';

fetch(serverUrl, {
    method: 'get'
}).then(function(response) {
    return response.json();
}).then(function(data) {
    console.log('data' + data);
}).catch(function(error) {
    console.log('error :' + error);
});

var Episode = React.createClass({
    render: function() {
        return (
            <EpisodeForm />
        );
    }
});

var EpisodeForm = React.createClass({
    getInitialState: function() {
        return {title: '', season: '', episode: ''};
    },
    handleTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    handleSeasonChange: function(e) {
        this.setState({season: e.target.value});
    },
    handleEpisodeChange: function(e) {
        this.setState({episode: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var season = this.state.season;
        var episode = this.state.episode;

        if (!title || !season || !episode) {
            return;
        }

        fetch(serverUrl, {
            method: 'post',
            mode: 'no-cors',
            body: JSON.stringify({"title": title, "season": season, "episode": episode})
        });
    },
    render: function() {
        return (
            <div className="episode-form" onSubmit={this.handleSubmit}>
                <form>
                    <div>
                        <label for="title">Serie</label>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleTitleChange} />
                    </div>
                    <div>
                        <label for="season">Season</label>
                        <input type="number" name="season" value={this.state.season} onChange={this.handleSeasonChange} />
                    </div>
                    <div>
                        <label for="episode">Episode</label>
                        <input type="number" name="episode" value={this.state.episode} onChange={this.handleEpisodeChange} />
                    </div>
                    <div>
                        <input type="submit" name="submit" />
                    </div>
                </form>
            </div>
        );
    }
});

render(<Episode/>, document.getElementById('episode-form'));