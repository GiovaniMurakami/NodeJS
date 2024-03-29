//Módulos externo
const inquirer = require('inquirer')
const chalk = require('chalk')
//Módulos internos
const fs = require('fs')

operation()

function operation(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }]).then((answer)=>{
        const action = answer['action']
        if(action === 'Criar conta'){
            createAccount()
        }
        if(action === 'Consultar saldo'){
            getAccountBalance()
        }
        if(action === 'Depositar'){
            deposit()
        }
        if(action === 'Sacar'){
            withdraw()
        }
        if(action === 'Sair'){
            logOut()
        }
    }).catch(err=>console.log(err))
}

function createAccount(){
    console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta a seguir:"))
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([
        {
            name: "accountName",
            message:"Digite um nome para a sua conta!"
        }
    ]).then((answer=>{
        accountName = answer['accountName']
        console.info(accountName)
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Essa conta já existe, escolha outro nome!'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, `{"balance": 0}`, function(err){
            console.log(err)
        })

        console.log(chalk.green("Parabéns, a sua conta foi criada!"))
        operation()
    }
    )).catch(err=>console.log(err))
}

function logOut(){
    console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"))
    process.exit()
}

function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer)=>{
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return deposit()
        }
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }
        ]).then((answer)=>{
            const amount = answer['amount']
            if(amount <= 0){
                console.log(chalk.bgRed.black("Valor deve ser maior que 0"))
                return deposit()
            }
            addAmount(accountName, amount)
            operation()
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black("Essa conta não existe, escolha outro nome!"))
        return false
    }
    return true
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log('Ocorreu um erro, tente mais tarde')
        return deposit() 
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        }
    )
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`))
    return
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })
    return JSON.parse(accountJSON)
}

function getAccountBalance(){
    inquirer.prompt([
        {
            name:'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer)=>{
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return getAccountBalance()
        }
        const accountData = getAccount(accountName)
        console.log(chalk.bgBlue.black(`O saldo da sua conta é de R$${accountData.balance}`))
        operation()
    }).catch(err=>console.log(err))
}

function withdraw(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer)=>{
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return withdraw()
        }
        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja sacar?'
        }]).then((answer)=>{
            const amount = answer['amount']
            removeAmount(accountName, amount)
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
}

function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount || accountData.balance < amount || amount <= 0){
        console.log(chalk.bgRed.black("Ocorre um erro, tente novamente mais tarde!"))
        return withdraw()
    }
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        }
    )
    console.log(chalk.bgGreen.black(`Foi realizado um saque de R$${amount} da sua conta!`))
    operation()
}
