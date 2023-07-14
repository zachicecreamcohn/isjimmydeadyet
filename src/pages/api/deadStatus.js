// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



async function getDeadStatus() {
  const response = fetch("https://api.api-ninjas.com/v1/celebrity?name=Jimmy%20Carter", {
    "method": "GET",
    "headers": {
      "X-Api-Key": "HJK5YfO6dOCO+r/WLXK9Bw==W6Mfg0oTP0Xx3YCD" //TODO: move to env
    }
  })
  
  const data = await (await response).json();
  
  let returnData = {
    is_dead: !data[0]["is_alive"],
    age: data[0]["age"]
  }

  if (returnData.is_dead) {
    returnData["death_date"] = data[0]["death"];
  }

  return returnData;
}
export default async function handler(req, res) {
  const data = await getDeadStatus();
  res.status(200).json(data );
}
