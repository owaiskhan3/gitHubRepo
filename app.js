var doc = document.getElementsByClassName("container");
var doc1 = document.getElementsByClassName("container1");

var inp = document.getElementById("username");
function onLoad() {
  doc[0].innerHTML = `<iframe src="https://giphy.com/embed/8RyJliVfFM6ac" width="80" height="80" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;
  doc1[0].innerHTML = "";

  console.log(inp.value);
  var data;
  var response = async function getResponse() {
    var inp = document.getElementById("username");
    console.log(inp);
    var res = await fetch(`https://api.github.com/users/${inp.value}`);
    data = await res.json();

    console.log(data);
    var newDiv = `<img src='${
      data.avatar_url
    }' style="width:30px, align-item:centre;"/>
    <h2 style="color:white;">Username: ${data.login}</h2>
    <p id="info", style="color:white;">Name: ${data.name}</p>
    <p id="info", style="color:white;">No. of Reppositories: ${
      data.public_repos
    }</p>
    <p id="info", style="color:white;">Followers: ${data.followers}</p>
    <p id="info", style="color:white;">Followings: ${data.following}</p>
    <p id="info", style="color:white;">Bio: ${data.bio}</p>
    <h1 style="color:white;">Repositories</h1>
    `;
    console.log(data.repos_url);
    var repos = await fetch(data.repos_url);
    var repo = await repos.json();
    console.log(repo);

    repo.forEach(function(items, index) {
      if (index < 5) {
        console.log(items.name);
        newDiv += `<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><div class="card bg-light mb-3 ml-3 col-sm-2 col-md-2 col-lg-2 col-xl-2" style="float:left">
          <div class="card-header"><a href="${items.html_url}"><h5>${
          items.name
        }</h5></div>
          <div class="card-body">
            <h6 class="card-title">${items.html_url}</h6>
            <p class="card-text" style="text-overflow:ellipsis">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          </a>
        </div>
      </div>
      `;
      }
    });
    setTimeout(() => {
      doc[0].innerHTML = newDiv;
    }, 6000);
  };
  response();
}
var data = async function getFollowers() {
  var resFollowers = await fetch(
    `https://api.github.com/users/${inp.value}/followers`
  );
  var dataFollowers = await resFollowers.json();
  console.log(dataFollowers);
  var followersOfFollower = [];
  var followingsOfFollowers = [];
  dataFollowers.forEach(function(items, index) {
    console.log(items);
    console.log(index);

    (async () => {
      var res = await fetch(items.followers_url);
      var json = await res.json();
      // json.forEach(function(itemss, index) {
      //   console.log(itemss);
      // });
      if (json) followersOfFollower.push(json.length);
      console.log(followersOfFollower);
    })();
    (async () => {
      var url = items.following_url;
      url = url.substring(0, url.length - 13);
      var res1 = await fetch(url);
      var json1 = await res1.json();
      // json.forEach(function(itemss, index) {
      //   console.log(itemss);
      // });
      if (json1) followingsOfFollowers.push(json1.length);

      console.log(followingsOfFollowers);
    })();
    doc1[0].innerHTML = "";
    setTimeout(() => {
      // doc1[0].innerHTML += `<br/><div class="container1" style="clear:both"><h3>Follower ${index +
      //   1} : ${items.login}</h3><ul class="list-group"><a href="${
      //   items.html_url
      // }" ><li class="item1 list-group-item list-group-item-action" style="text-decoration:none"><img src=${
      //   items.avatar_url
      // } style="height:100px, width:100px"/><br/><p>Followers ${
      //   followersOfFollower[index]
      // }
      // </p>
      //   <p>Followings ${followingsOfFollowers[index]}</p><br/>
      //   </li></a></ul></div>`;
      doc1[0].innerHTML += `<div class="card ml-1 mb-1 col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" style="width: 18rem,height:auto, display:inline-block;">
      <img src=${items.avatar_url} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${items.login}</h5>
        <p class="card-text">
          <p style="color:navy;">Followers ${followersOfFollower[index]} <br/>
          Followings ${followingsOfFollowers[index]}</p>
          </p>
                  <a href="${
                    items.html_url
                  }" class="btn btn-primary">View GitHub Profile</a>
      </div>
    </div>`;
    }, 4000);
  });
};
// data();
