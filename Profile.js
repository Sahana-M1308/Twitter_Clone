import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile({ userId }) {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  // 🔥 Fetch profile safely
  useEffect(() => {
    console.log("USER ID:", userId); // debug

    // ❗ stop if userId is null
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/profile/${userId}`
        );

        console.log("PROFILE DATA:", res.data); // debug

        setUser(res.data.user);
        setTweets(res.data.tweets);

      } catch (err) {
        console.log(
          "PROFILE ERROR:",
          err.response?.data || err.message
        );
      }
    };

    fetchProfile();
  }, [userId]);

  // 🔄 Loading state
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>👤 Profile</h2>

      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Followers:</b> {user.followers.length}</p>
      <p><b>Following:</b> {user.following.length}</p>

      <hr />

      <h3>My Tweets 🐦</h3>

      {tweets.length === 0 ? (
        <p>No tweets yet</p>
      ) : (
        tweets.map((t) => (
          <div key={t._id}>
            <p>{t.text}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;
