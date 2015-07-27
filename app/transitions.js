

export default function(){
  this.transition(
    this.childOf('.points'),
    this.use('toUp')
  );
  this.transition(
    this.childOf(".timer .remaining"),
    this.use('toUp')
  );
}
