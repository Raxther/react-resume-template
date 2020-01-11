import React, { Component } from 'react';

const encode = (data) => {
   return Object.keys(data)
       .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
       .join("&");
 }

class Contact extends Component {

   constructor(props) {
      super(props);
      this.state = {};
    }

   handleSubmit = e => {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contactForm", ...this.state })
      })
        .then(() => alert("Votre message a bien été envoyé :)"))
        .catch(() => alert("Une erreur est survenue"));

      e.preventDefault();
    };

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Me contacter.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>
         <div className="row">
            <div className="eight columns">

               <form onSubmit={this.handleSubmit} id="contactForm" name="contactForm" data-netlify="true" data-netlify-honeypot="bot-field">
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Nom <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={this.handleChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Sujet</label>
						   <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.handleChange}/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea cols="70" rows="10" id="contactMessage" name="contactMessage"></textarea>
                  </div>

                  <div>
                     <button className="submit" type="submit" disabled={!this.state.contactMessage || !this.state.contactEmail || !this.state.contactName}>Envoyer</button>
                  </div>
					</fieldset>
				   </form>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Addresse</h4>
					   <p className="address">
						   {name}<br />
						   {street} <br />
						   {city}, {state} {zip}<br />
						   <span>{phone}</span><br />
						   <span>{email}</span>
					   </p>
				   </div>
            </aside>
      </div>
   </section>
    );
  }
}

export default Contact;
