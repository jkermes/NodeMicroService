import React from 'react'
import { render } from 'react-dom'

var serverUrl = 'http://localhost:9312';

var Episode = React.createClass({
    render: function() {
        return (<div>
			<EpisodeList />
            <EpisodeForm />
            </div>
        );
    }
});

var EpisodeList = React.createClass({
	getInitialState: function() {
        return {episodes: ''};
    },
	loadAllEpisodes: function() {
		fetch(serverUrl, {
			method: 'get'
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			this.setState({episodes: data});
		}).catch(function(error) {
			console.log('error :' + error);
		});
	},
	render: function(){
		return (
			
			<tr>
				<td>Title</td>
				<td>Saison</td>
				<td>Episode</td>
			</tr>
			
		);
	},
	componentWillMount: function() {
		this.loadAllEpisodes();
		console.log(this.state.episodes);
	}
});

var EpisodeListItem = React.createClass({
	render: function(){
		return (
			<tr>
				<td></td>
				<td></td>
				<td></td>
			</tr>
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
