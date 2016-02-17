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
        var data;
        var req = new XMLHttpRequest();
        req.open('GET', 'http://localhost:9312/', true);
        req.overrideMimeType('application/json');
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    data = req.responseText;
                    console.log(data);
                }
                else {
                     console.log('Erreur pendant le chargement de la page.\n');
                }
            }
        };
        console.log(data);
        req.send(null);

        this.setState({episodes: data});
        
	},
	   render: function() {
        return (<table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Serie</td>
                            <td>Season</td>
                            <td>Episode</td>
                        </tr>
                    </thead>
                    <tbody>
                    //</EpisodeListItem>
						<tr>
							<td>1</td>
							<td>Game of thrones</td>
							<td>3</td>
							<td>2</td>
						</tr>
                    </tbody>
                </table>
        );
    },
	componentDidMount: function() {
		this.loadAllEpisodes();
		console.log(this.state.episodes);
	}
});

var EpisodeListItem = React.createClass({
	render: function() {
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

render(<EpisodeList/>, document.getElementById('episode-list'));
render(<EpisodeForm/>, document.getElementById('episode-form'));
