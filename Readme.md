<h3>Personal Expenses Management Application overview<h3>
    <p>Personal expenses management offline application that allows users to track how much money have they spent.</p>
    
    <b>How to install:</b>
    <ul>
        <li>Run <b>npm install</b> in root directory</li>
        <li>After successfull installation, run <b>npm start</b></li>
    </ul>
    
    Following commands which supported by application
     <ul>
      <li>add 2017-04-25 12 USD Jogurt — adds expense entry to the list
      of user expenses. Command accepts following parameters:
        <ul>
          <li>2017-04-25 — is the date when expense occurred</li>
          <li>12 — is an amount of money spent</li>
          <li>USD — the currency in which expense occurred</li>
          <li>Jogurt — is the name of product purchased</li>
        </ul>
      </li>
      <li>list — shows the list of all expenses sorted by date</li>
          <li>clear 2017-04-25 — removes all expenses for specified date,
    where:
        <ul>
        <li>2017-04-25 — is the date for which all expenses should be
    removed</li>
        </ul>
          </li>
        <li>total PLN — this command takes a list of exchange rates
                from http://fixer.io, calculates the total amount of money spent and
                present it to user in specified currency, where:
                <ul>
                    <li>PLN — is the currency in which total amount of expenses should
                        be presented
                    </li>
                </ul>
            </li>
    </ul>
