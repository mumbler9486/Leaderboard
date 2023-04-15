export const youtubeUrlRegex =
	/^(?:https?:)?(?:[/][/])?(?:youtu[.]be[/]|(?:www[.]|m[.])?youtube[.]com[/](?:watch|v|embed)(?:[.]php)?(?:[?].*v=|[/]))([a-zA-Z0-9[\\\]_-]{7,15})(?:[\?&][a-zA-Z0-9[\\\]_-]+=[a-zA-Z0-9[\\\]_-]+)*$/;

/**
 * Formats a youtube link into a standardized format.
 * I.e converts to https://youtu.be/VIDEO_CODE
 */
export const normalizeYoutubeLink = (url: string) => {
	if (!url) {
		return undefined;
	}

	const youtubeCode = extractYoutubeCode(url);
	const youtubeLink = `https://youtu.be/` + youtubeCode;
	return youtubeLink;
};

export const getYoutubeEmbedUrl = (url: string) => {
	if (!url) {
		return undefined;
	}

	const youtubeCode = extractYoutubeCode(url);
	return `https://www.youtube-nocookie.com/embed/${youtubeCode}`;
};

const extractYoutubeCode = (url: string) => {
	const match = url.match(youtubeUrlRegex);
	if (!match) {
		return undefined;
	}

	const youtubeCode = match[1];
	return youtubeCode;
};
