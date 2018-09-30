module.exports = {
  EchoGuild: gid => {
    const EGTemplate = {
      constructor(gid) {
        this.gid = gid;
      }
    }
    return EGTemplate;
  }
}