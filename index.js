class MemStore {
    constructor( server ) {
        Reflect.defineProperty( this, 'timer', { value: setInterval( () => this.clear(), 10 * 60 * 1000 ) } );
        Reflect.defineProperty( this, 'sessions', { value: {}, enumerable: true } );
        server && server.on( 'close', () => clearInterval( this.timer ) );
    }
    async get( key, maxAge, { rolling } ) {
        return this.sessions[ key ];
    }
    async set( key, sess, maxAge, { rolling, changed } ) {
        this.sessions[ key ] = sess;
    }
    async destroy( key ) {
        delete this.sessions[ key ];
    }
    clear() {
        const now = Date.now();
        for ( let key in this.sessions ) {
            if ( this.sessions[ key ]._expire < now ) {
                delete this.sessions[ key ];
            }
        }
    }
    close() {
        clearInterval( this.timer );
    }
};

module.exports = MemStore;
