export async function loadCSS(path, element) {
  const request = await fetch(path);
  const styles = await request.text();

  element.textContent = styles;
}
