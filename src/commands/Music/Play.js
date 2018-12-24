const { Command, Timestamp, DUtil: { escapeMarkdown } } = require("../../Modules/Index.js");
const fetch = require('node-fetch');

const prompts = {};
const URL_REGEX = /^(https?:\/\/)?(www\.|[a-zA-Z-_]+\.)?(vimeo\.com|mixer\.com|bandcamp\.com|twitch\.tv|soundcloud\.com|youtube\.com|youtu\.?be)\/.+$/,
	YOUTUBE_PLAYLIST_REGEX = new RegExp('[&?]list=([a-z0-9-_]+)', 'i');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "play",
      description: "Allows you to play music!",
      usage: '[TrackURL:url|Query:string]'
    });
  }

  async run(msg, [query]) {
		if (!msg.member.voice.channel) throw '<:bloboutage:396514815863947266> | Please connect to a voice channel first.';
		if (!msg.member.voice.channel.permissionsFor(msg.guild.me.id).has(['CONNECT', 'SPEAK', 'VIEW_CHANNEL'])) throw `<:bloboutage:396514815863947266> | I do not have the required permissions (**Connect**, **Speak**, **View Channel**) to play music in #**${msg.member.voice.channel.name}**.`; // eslint-disable-line max-len
		if (prompts[msg.member.id]) throw '<:bloboutage:396514815863947266> | You are currently being prompted. Please pick one first or cancel the prompt.';
		const { queue } = await msg.guild.music;
		if (!query) {
			if (msg.guild.player.playing) throw '<:bloboutage:396514815863947266> | Music is playing in this server, however you can still enqueue a song.';
			if (!queue.length) throw `<:bloboutage:396514815863947266> | There are no songs in the queue. You can use the playlist feature or add one using \`${msg.guild.settings.get('prefix')}play\``;
			msg.send('🎶 | No search query provided, but I found tracks in the queue so I\'m gonna play it.');
			this.join(msg);
			return this.play(msg, queue[0]);
		}
		const song = await this.resolveQuery(msg, query);
		delete prompts[msg.member.id];
		if (!Array.isArray(song) && msg.guild.settings.get('donation') < 5 && !song.info.isStream && song.info.length > 18000000) throw `<:bloboutage:396514815863947266> | **${song.info.title}** is longer than 5 hours.`; // eslint-disable-line max-len
		if (!msg.guild.player.channel) this.join(msg);
		await this.addToQueue(msg, song);
		if (msg.flags.force && msg.guild.player.playing && await msg.hasAtLeastPermissionLevel(5)) return msg.guild.player.stop();
		return this.play(msg, queue.length && !msg.flags.force ? queue[0] : Array.isArray(song) ? song[0] : song);
	}

	join({ guild, channel, member }) {
		if (!member.voice.channel) throw '<:bloboutage:396514815863947266> | Please do not leave the voice channel.';
		this.client.player.leave(guild.id);
		this.client.player.join({
			host: this.client.options.nodes[0].host,
			guild: guild.id,
			channel: member.voice.channel.id
		}, { selfdeaf: true });
		guild.player.on('error', error => channel.send(`<:bloboutage:396514815863947266> | ${error.error}`));
	}

	async resolveQuery(msg, query) {
		const { loadType, tracks } = await this.getSongs(query, query.includes('soundcloud.com') || Boolean(msg.flags.soundcloud));
		if (loadType === 'LOAD_FAILED') throw '<:bloboutage:396514815863947266> | Something went wrong when loading your search. Sorry \'bout that! Please try again.';
		else if (loadType === 'NO_MATCHES') throw '<:bloboutage:396514815863947266> | No track found for your query.';
		else if (loadType === 'TRACK_LOADED') return tracks[0];
		else if (loadType === 'PLAYLIST_LOADED') return tracks;

		// From here on out, loadType === 'SEARCH_RESULT' : true
		if (!msg.flags.advanced) return tracks[0];
		const finds = tracks.slice(0, 5);
		prompts[msg.member.id] = finds;
		let limit = 0, choice;
		do {
			if (limit++ >= 5) {
				delete prompts[msg.member.id];
				throw '<:bloboutage:396514815863947266> | Too many invalid replies. Please try again.';
			}
			choice = await msg.prompt([
				`🎶 | **${escapeMarkdown(msg.member.displayName)}**, please **reply** the number of the song you want to play: (reply \`cancel\` to cancel prompt)`,
				finds.map((result, index) => {
					const { length } = result.info;
					return `\`${index + 1}\`. **${escapeMarkdown(result.info.title)}** by ${escapeMarkdown(result.info.author)} \`${new Timestamp(`${length >= 86400000 ? 'DD:' : ''}${length >= 3600000 ? 'HH:' : ''}mm:ss`).display(length)}\``; // eslint-disable-line max-len
				}).join('\n')
			].join('\n')).catch(() => ({ content: 'cancel' }));
		} while ((choice.content !== 'cancel' && !parseInt(choice.content)) || parseInt(choice.content) < 1 || parseInt(choice.content) > prompts[msg.member.id].length);
		if (choice.content === 'cancel') {
			delete prompts[msg.member.id];
			throw '<:blobthumbsup:398843278235009024> | Successfully cancelled prompt.';
		}
		return prompts[msg.member.id][parseInt(choice.content) - 1];
	}

	async getSongs(query, soundcloud) {
		let searchString;
		if (URL_REGEX.test(query) || ['.m3u', '.pls', 'xspf'].includes(query.slice(-4))) {
			searchString = query;
			if (YOUTUBE_PLAYLIST_REGEX.test(searchString)) searchString = `https://youtube.com/playlist?list=${YOUTUBE_PLAYLIST_REGEX.exec(searchString)[1]}`;
		} else { searchString = `${soundcloud ? 'scsearch' : 'ytsearch'}:${encodeURIComponent(query)}`; }
		return fetch(`http://${this.client.options.nodes[0].host}:${this.client.options.nodes[0].port}/loadtracks?identifier=${searchString}`, { headers: { Authorization: this.client.options.nodes[0].password } }) // eslint-disable-line max-len
			.then(res => res.json())
			.catch(err => {
				this.client.emit('wtf', err);
				throw '<:bloboutage:396514815863947266> | There was an error, please try again.';
			});
	}

	/* eslint-disable complexity */
	async addToQueue(msg, song) {
		const { queue } = await msg.guild.music;
		if (msg.flags.force && await msg.hasAtLeastPermissionLevel(5)) {
			const songs = Array.isArray(song) ? song : [song];
			if (msg.guild.player.playing) queue.splice(1, 0, ...songs);
			else queue.splice(0, 1, ...songs);
		} else if (Array.isArray(song)) {
			let songCount = 0;
			for (const track of song) {
				if (track.info.length > 18000000) continue;
				queue.push(track);
				songCount++;
			}
			msg.send(`🎶 | **${songCount} song${songCount === 1 ? '' : 's'}** ha${songCount === 1 ? 's' : 've'} been added to the queue.`);
			if (songCount < song.length) msg.channel.send('⚠ | All songs longer than 5 hours weren\'t added.');
		} else {
			queue.push(song);
			msg.send(`🎶 | **${song.info.title}** has been added to the queue to position \`${queue.length === 1 ? 'Now Playing' : `#${queue.length - 1}`}\`. For various music settings, run \`${msg.guild.settings.get('prefix')}conf show music\`. Change settings with \`set\` instead of \`show\`.`); // eslint-disable-line max-len
		}
		await this.client.providers.default.update('music', msg.guild.id, { queue });
		return queue;
	}
	/* eslint-enable complexity */

	async play({ guild, channel }, song) {
		if (guild.player.playing) return;
		guild.player.play(song.track);
		guild.player.pause(false);
		guild.player.once('end', async data => {
			if (data.reason === 'REPLACED') return null;
			const { queue } = await guild.music;
			queue.shift();
			await this.client.providers.default.update('music', guild.id, { queue });
			if (this.client.guilds.get(guild.id)) {
				if (queue.length) return this.play({ guild, channel }, queue[0]);
				channel.send('👋 | No song left in the queue, so the music session has ended! Thanks for listening!');
				return this.client.player.leave(guild.id);
			} else {
				guild.player.removeAllListeners();
				guild.player.destroy();
				return this.client.player.delete(guild.id);
			}
		});
		channel.send(`🎧 | Now Playing: **${escapeMarkdown(song.info.title)}** by ${escapeMarkdown(song.info.author)}`);
	}

	async init() {
		const defProvider = this.client.providers.default;
		if (!await defProvider.hasTable('music')) defProvider.createTable('music');
	}

};
