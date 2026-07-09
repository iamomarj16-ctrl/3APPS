import React, { useState, useEffect } from 'react';

function Gf() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  // Isse poori body ka background dark ho jayega jab aap is page par aaoge
  useEffect(() => {
    document.body.style.backgroundColor = '#0f172a';
    return () => {
      document.body.style.backgroundColor = ''; // Page leave karne par normal ho jayega
    };
  }, []);

  const fetchGithubUser = async () => {
    if (!username) return;
    try {
      setError('');
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        setError('user not found!');
        setUserData(null);
      }
    } catch (err) {
      setError('Error!');
    }
  };

  return (
    <div style={{ 
      display: 'block', 
      clear: 'both', 
      margin: '30px auto', 
      padding: '25px', 
      maxWidth: '400px', 
      borderRadius: '12px', 
      background: '#1e293b', 
      color: '#ffffff', 
      textAlign: 'center',
      boxShadow: '0px 10px 25px rgba(0,0,0,0.5)',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '20px' }}>GitHub User Finder</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Enter GitHub Username..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ 
            padding: '12px', 
            width: '65%', 
            marginRight: '10px', 
            border: '1px solid #475569', 
            borderRadius: '6px', 
            color: '#fff', 
            background: '#0f172a', 
            outline: 'none'
          }}
        />
        <button onClick={fetchGithubUser} style={{ 
          padding: '12px 18px', 
          cursor: 'pointer', 
          background: '#38bdf8', 
          color: '#0f172a', 
          border: 'none', 
          borderRadius: '6px', 
          fontWeight: 'bold'
        }}>
          Search
        </button>
      </div>

      {error && <p style={{ color: '#f87171', fontWeight: 'bold' }}>{error}</p>}

      {userData && (
        <div style={{ marginTop: '25px', borderTop: '1px solid #334155', paddingTop: '20px' }}>
          <img src={userData.avatar_url} alt="avatar" style={{ width: '110px', height: '110px', borderRadius: '50%', border: '3px solid #38bdf8' }} />
          <h3 style={{ color: '#ffffff', margin: '15px 0 5px 0', fontSize: '22px' }}>{userData.name || userData.login}</h3>
          
          <p style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic', marginBottom: '15px' }}>
            {userData.bio ? userData.bio : 'No Bio Added By User'}
          </p>
          
          <div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', marginBottom: '15px', textAlign: 'left' }}>
            <p style={{ color: '#cbd5e1', margin: '5px 0' }}><strong>Public Repos:</strong> {userData.public_repos}</p>
            <p style={{ color: '#cbd5e1', margin: '5px 0' }}><strong>Followers:</strong> {userData.followers}</p>
            <p style={{ color: '#cbd5e1', margin: '5px 0' }}><strong>Following:</strong> {userData.following}</p>
            <p style={{ color: '#cbd5e1', margin: '5px 0' }}><strong>Location:</strong> {userData.location || 'Not Specified'}</p>
          </div>

          <a href={userData.html_url} target="_blank" rel="noreferrer" style={{ 
            display: 'inline-block', 
            padding: '10px 20px', 
            background: '#22c55e', 
            color: '#fff', 
            textDecoration: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
          }}>
            Explore Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Gf;