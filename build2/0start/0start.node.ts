namespace $ {

	let $mol_build2_0start_root = null as null | $mol_build2_2root

	export function $mol_build2_0start() {

		if( !$mol_rpc_worker.is_main() ) {
			new $mol_wire_atom( '$mol_build2_7checker', ()=> $.$mol_one.$mol_build2_7checker.start() ).fresh()
			return
		}

		try {

			const args = process.argv.slice( 2 )

			if( args.every( arg => /^[^=]+=/.test( arg ) ) ) {
				$.$mol_build2_1server.serve()
				return
			}

			const root = $mol_build2_0start_root ??= new $.$mol_build2_2root

			for( const path of args ) {
				root.pack( root.dir().resolve( path ) ).bundles_generated()
			}

			process.exit(0)

		} catch( error ) {

			if( $mol_promise_like( error ) ) $mol_fail_hidden( error )

			$mol_ambient({}).$mol_log3_fail({
				place: 'mol/build2/0start',
				message: ( error as Error ).stack ?? String( error ),
			})

			process.exit(1)

		}

	}

	setTimeout( ()=> $mol_wire_async( $ ).$mol_build2_0start() )

}
