export default function renderGameThumbnail({
	slug,
	name,
	background_image,
	released,
	metacritic,
}) {
	const releasedDate = new Date(released);
	return `<a href="/detail-${slug}">
				<img src="${background_image}" />
				<footer>
					<h3>${name}</h3>
					<div class="infos">
						<time datetime="${released}">${releasedDate.toLocaleDateString()}</time>
						<span class="metacritic">${metacritic}</span>
					</div>
				</footer>
			</a>`;
}
