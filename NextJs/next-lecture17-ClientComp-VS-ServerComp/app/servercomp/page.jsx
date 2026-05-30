const URL = "https://jsonplaceholder.typicode.com/posts";

const ServerComp = async () => {
  const res = await fetch(URL);
  const data = await res.json();

  console.log(data); // server console me show hoga

  return (
    <>
      <h1>Server Comp</h1>

      <ul className="grid grid-cols-3 gap-5">
        {data.map((curElem, index) => (
          <li key={index}>{curElem.body}</li>
        ))}
      </ul>
    </>
  );
};

export default ServerComp;
