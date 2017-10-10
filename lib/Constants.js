var bower = require('bower'),
    path = require('path'),
    fs = require('fs');

module.exports = {
    DefaultProjectManifestPath : './adapt.json',
    DefaultProjectFrameworkPath: './package.json',
    DefaultCreateType : 'course',
    DefaultTypeNames : {
        'course':'my-adapt-course',
        'component':'my-adapt-component'
    },
    FrameworkRepository : process.env.ADAPT_FRAMEWORK || 'https://github.com/adaptlearning/adapt_framework',
    FrameworkRepositoryName : 'adapt_framework',
    ComponentRepository : process.env.ADAPT_COMPONENT || 'https://github.com/adaptlearning/adapt-component',
    ComponentRepositoryName : 'adapt-component',
    DefaultBranch : process.env.ADAPT_BRANCH || 'prototype4',
    Registry: getRegistry(),
    HomeDirectory : searchForHome(),
    MaxAttempts: 2
};

function searchForHome() {
    var locations = [
            process.env.HOME,
            (process.env.HOMEDRIVE + process.env.HOMEPATH),
            process.env.USERPROFILE,
            '/tmp',
            '/temp',
        ];
    var validLocations =  locations.filter(fs.existsSync);
    return validLocations[0];
}

function getRegistry() {
    if (process.env.ADAPT_REGISTRY) return process.env.ADAPT_REGISTRY;
    if (fs.existsSync('./.bowerrc')) {
        return JSON.parse(fs.readFileSync('./.bowerrc').toString()).registry;
    }
    if (fs.existsSync('../../.bowerrc')) {
        return JSON.parse(fs.readFileSync('../../.bowerrc').toString()).registry;
    }
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../.bowerrc')).toString()).registry;;
}
