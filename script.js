async function getProfile() {
  const username = document.getElementById("userName").value.trim();
  const profileDiv = document.getElementById("profile");

  if (!username) {
    profileDiv.innerHTML = "<p>Please enter a GitHub username.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User Not Found");
    }

    const data = await response.json();
    console.log(data);

    profileDiv.innerHTML = `
      <div class="profile-card">
        <img src="${data.avatar_url}" alt="Avatar" width="80" style="border-radius: 50%;" />
        <h2>${data.name || "Name not available"}</h2>
        <p><strong>Bio:</strong> ${data.bio || "No bio provided"}</p>
        <p><strong>Location:</strong> ${data.location || "Not specified"}</p>
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><strong>Following:</strong> ${data.following}</p>
        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
        <p><strong>Company:</strong> ${data.company || "Not listed"}</p>
      </div>
    `;
  } catch (err) {
    profileDiv.innerHTML = `<p style="color:red;">User not found or error occurred.</p>`;
    console.error("Error:", err);
  }
}
