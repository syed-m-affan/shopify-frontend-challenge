
import './App.css';
import { Component } from 'react';




class App extends Component {

  

  constructor(props){

    super(props)
    this.state = {

      prompts: [],
      responses: [],
      text:"",
      engine:"text-curie-001"
    }

    this.onChangeEngine = this.onChangeEngine.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.renderRows = this.renderRows.bind(this)

  }

  onChangeEngine(e){
    this.setState({
      engine: e.target.value
    })
  }

  
  onChangeText(e){
    this.setState({
      text: e.target.value
    })

  }

  async onSubmit(e){
    
    e.preventDefault()
    let prompts = this.state.prompts
    let engine = this.state.engine
    let text = this.state.text
    let secret = process.env.OPENAI_SECRET
    console.log(secret)
    

    const data = {
      prompt: text,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      };
      
    let completion = await fetch("https://polar-chamber-58200.herokuapp.com/https://api.openai.com/v1/engines/"+engine+"/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${secret}`,
            },
            body: JSON.stringify(data),
            }).then(res => res.json())

    

    console.log(completion.choices[0].text)
      
      

    prompts.push({prompt:this.state.text, response: completion.choices[0].text})
    this.setState({
      prompts: prompts,
    })
  }

  renderRows() {
   

    return  this.state.prompts.map(function(o, i) {
              return (
                <tr key={"item-" + i}>
                  <td>
                    {o.prompt}
                  </td>
                  <td>
                    {o.response}
                  </td>
                </tr>
              );
            });
  }
  

  render(){
  return (
    <div className="App">
      <header><b>Shopify Frontend Challenge</b></header>
      <form onSubmit={this.onSubmit}>
        <input type="text" onChange={this.onChangeText} value={this.state.text}></input>
        <button type='submit' >Submit</button>
        <select onChange={this.onChangeEngine} defaultValue="text-curie-001">
          <option value="text-curie-001">text-curie-001</option>
          <option value="text-babbage-001">text-babbage-001</option>
          <option value ="text-ada-001">text-ada-001</option>
        </select>
      </form>
      <table align="center">
        <thead>
          <tr>
            <th>Prompt</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    </div>
  );
  }
}

export default App;
