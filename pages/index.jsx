import { useState } from "react";
import axios from "axios";

export default function Index(props) {
  const [res, setRes] = useState(null);

  function callAPI() {
    axios({
      method: "POST",
      url: "/api/graphql",
      data: {
        query: `
            query Query{
                getBooks {
                name
                }
            }
        `,
      },
    })
      .then((_res) => {
        setRes(JSON.stringify(_res.data));
      })
      .catch((e) => console.log(e));
  }

  return (
    <div>
      <button onClick={() => callAPI()}>Click me!</button>
      <p>{res}</p>
    </div>
  );
}
