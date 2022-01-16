import * as crypto from 'crypto';

class Block {

  readonly hash: string;

  constructor (readonly index: number, readonly prevHash: string, readonly timestamp: number, readonly data: string) {
    this.hash = this.calculateHash();
  }

  private calculateHash(): string {
    const data = this.index + this.prevHash + this.timestamp + this.data;
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}

class Blockchain {
  private readonly chain: Block[] = [];

  private get lastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  constructor() {
    // Genesis block
    this.chain.push(new Block(0, '0', Date.now(), 'Genesis block'));
  }

  addBlock(data: string): void {
    const block = new Block(this.lastBlock.index + 1, this.lastBlock.hash, Date.now(), data);
    this.chain.push(block);
  }
}

console.log('Creating the blockchain with the genesis block...');
const blockchain = new Blockchain();

console.log('Mining block #1...');
blockchain.addBlock('First block');

console.log('Mining block #2...');
blockchain.addBlock('Second block');

console.log(JSON.stringify(blockchain, null, 2));
 