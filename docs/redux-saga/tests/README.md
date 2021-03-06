Redux-Saga 测试用例阅读：

**目标：熟悉 Redux-Saga 所有用法**

## /packages/core/__tests__
阅读顺序不分先后

### runSaga.js
- [x] test('runSaga'),[demo](./core/runSaga/)

### middleware.js
`({getState, dispatch}) => next => action => action`
- [x] test('middleware output')
  * middleware factory must return a function to handle {getState, dispatch}
  * middleware returned function must take exactly 1 argument
  * next handler must return a function to handle action
  * next handler must take exactly 1 argument
  * next handler must return a function to handle action
  * action handler must take exactly 1 argument
- [x] test('middleware's action handler output')
  * action handler must return the result of the next argument
- [x] test('middleware.run')
  * middleware.run must throw an Error when executed before the middleware is connected to a Store
  * middleware.run must return a Task Object
  * middleware must run the Saga and provides it with the given arguments
- [x] test('middleware options')
  * middleware factory must raise an error if `options.onError` is not a function
- [x] test('enhance channel.put with an emitter')
  * saga must be able to take actions emitted by middleware's custom emitter
- [x] test('middleware.run saga arguments validation')
  * saga argument must be a Generator function

### taskToPromise.js
- [x] test('calling toPromise() of an already completed task')
- [x] test('calling toPromise() before a task completes')
- [x] test('calling toPromise() of an already aborted task')
- [x] test('calling toPromise() before a task aborts')
- [x] test('calling toPromise() of an already cancelled task')
- [x] test('calling toPromise() of before a task gets cancelled')

### channel-recipes.js
- [x] test('action channel')
  * Sagas must take consecutive actions dispatched synchronously on an action channel even if it performs blocking calls
- [x] test('error check when constructing actionChannels')
- [x] test('action channel generator')
- [x] test('action channel generator with buffers')
- [x] test('channel: watcher + max workers')
  * Saga must dispatch to free workers via channel

### channel.js
- [x] test('Unbuffered channel')
  * channel should reject undefined messages
  * channel must notify takers
  * channel must discard cancelled takes
  * closing a channel must resolve all takers with END
  * closed channel must resolve new takers with END
  * channel must reject messages after being closed
- [x] test('buffered channel')
  * channel must queue pending takers if there are no buffered messages
  * channel must resolve the oldest pending taker with a new message
  * channel must buffer new messages if there are no takers
  * channel must resolve new takers if there are buffered messages
  * closing an already closed channel should be noop
  * putting on an already closed channel should be noop
  * closed channel must resolve new takers with any buffered message
  * closed channel must resolve new takers with END if there are no buffered message
- [x] test('event channel')
  * eventChannel should throw if subscriber does not return a function to unsubscribe
  * eventChannel must notify takers on a new action
  * eventChannel must notify takers only once
  * eventChannel must notify all pending takers on END
  * eventChannel must notify all new takers if closed
- [x] test('unsubscribe event channel')
  * eventChannel should call unsubscribe when channel is closed
  * eventChannel should call unsubscribe when END event is emitted synchronously
  * eventChannel should call unsubscribe when END event is emitted asynchronously
- [x] test('expanding buffer')
  * expanding buffer should be able to buffer more items than its initial limit

### scheduler.js
- [x] test('scheduler executes all recursively triggered tasks in order')
- [x] test('scheduler when suspended queues up and executes all tasks on flush')

### monitoring.js
- [x] test('saga middleware monitoring')
  * sagaMiddleware must notify the saga monitor of Effect creation and resolution
  * sagaMiddleware must notify the saga monitor of dispatched actions
- [x] test('runSaga monitoring')
  * runSaga must notify the saga monitor of Effect creation and resolution
  * runSaga must notify the saga monitor of dispatched actions
- [x] test('saga monitors without all functions')

### interpreter/base.js
- [x] test('saga iteration')
- [x] test('saga error handling')
- [x] test('saga output handling')
- [x] test('saga yielded falsy values')

### interpreter/call.js
- [x] test('saga handles call effects and resume with the resolved values')
- [x] test('saga handles call effects and throw the rejected values inside the generator')
- [x] test('saga handles call's synchronous failures and throws in the calling generator (1)')
- [x] test('saga handles call's synchronous failures and throws in the calling generator (2)')
- [x] test('saga handles call's synchronous failures and throws in the calling generator (2)')

### interpreter/cps.js
- [x] test('saga cps call handling')
  * saga must fulfill cps call effects
- [x] test('saga synchronous cps failures handling')
  * saga should inject call error into generator
- [x] test('saga cps cancellation handling')
  * saga should call cancellation function on callback

### interpreter/put.js
- [x] test('saga put handling')
  * saga must handle generator puts
- [x] test('saga put in a channel')
  * saga must handle puts on a given channel
- [x] test('saga async put's response handling')
  * saga must handle async responses of generator put effects
- [x] test('saga error put's response handling')
  * saga should bubble thrown errors of generator put effects
- [x] test('saga error putResolve's response handling')
  * saga must bubble thrown errors of generator putResolve effects
- [x] test('saga nested puts handling')
  * saga must order nested puts by executing them after the outer puts complete
- [x] test('puts emitted while dispatching saga need not to cause stack overflow')
  * this saga needs to run without stack overflow
- [x] test('puts emitted directly after creating a task (caused by another put) should not be missed by that task')
- [x] test('END should reach tasks created after it gets dispatched')

### interpreter/take.js
- [x] test('saga take from default channel')
  * take all actions
  * take only actions of type 'action-1'
  * take either type
  * take if match predicate
  * take if match any from the mixed array
  * take only actions of a Symbol type
- [x] test('saga take from provided channel')
  * saga must fulfill take Effects from a provided channel
- [x] test('saga take from eventChannel')
  * saga must take payloads from the eventChannel, and errors from eventChannel will make the saga jump to the catch block

### interpreter/takeSync.js
- [x] test('synchronous sequential takes')
  * Sagas must take consecutive actions dispatched synchronously
- [x] test('synchronous concurrent takes')
  * In concurrent takes only the winner must take an action
- [x] test('synchronous parallel takes')
  * Saga must resolve once all parallel actions dispatched
- [x] test('synchronous parallel + concurrent takes')
  * Saga must resolve once all parallel actions dispatched
- [x] test('startup actions')
  * Saga must be able to dispatch startup actions
- [x] test('synchronous takes + puts')
  * Sagas must be able to interleave takes and puts without losing actions
- [x] test('synchronous takes (from a channel) + puts (to the store)')
  * Sagas must be able to interleave takes (from a channel) and puts (to the store) without losing actions
- [x] test('inter-saga put/take handling')
  * Sagas must take actions from each other
- [x] test('inter-saga put/take handling (via buffered channel)')
  * Sagas must take actions from each other (via buffered channel)
- [x] test('inter-saga send/acknowledge handling')
  * Sagas must take actions from each other in the right order
- [x] test('inter-saga send/acknowledge handling (via unbuffered channel)')
  * Sagas must take actions from each other (via unbuffered channel) in the right order
- [x] test('inter-saga send/acknowledge handling (via buffered channel)')
  * Sagas must take actions from each other (via buffered channel) in the right order
- [x] test('inter-saga fork/take back from forked child 1')
  * Sagas must take actions from each forked childs doing Sync puts
- [x] test('deeply nested forks/puts')
  * must schedule deeply nested forks/puts
- [x] test('inter-saga fork/take back from forked child 2')
  * Sagas must take actions from each forked childs doing Sync puts
- [x] test('put causing sync dispatch response in store subscriber')
  * Sagas can't miss actions dispatched by store subscribers during put handling
- [x] test('action dispatched in root saga should get scheduled and taken by a "sibling" take')
- [x] test('action dispatched synchronously in forked task should be taken a following sync take')

### interpreter/fork.js
- [x] test('should not interpret returned effect. fork(() => effectCreator())')
- [x] test('should not interpret returned effect. yield fork(takeEvery, 'pattern', fn)')
- [x] test('should interpret returned promise. fork(() => promise)')
- [x] test('should handle promise that resolves undefined properly. fork(() => Promise.resolve(undefined))')
- [x] test('should interpret returned iterator. fork(() => iterator)')

### interpreter/forkjoin.js
- [x] test('saga fork handling: generators')
  * fork result must include the name of the forked generator function
  * fork result must include the promise of the task result
  * fork result must resolve with the return value of the forked task
  * fork must also handle generators defined as instance methods
- [x] test('saga join handling : generators')
  * saga must not block on forked tasks, but block on joined tasks
- [x] test('saga fork/join handling : functions')
  * saga must not block on forked tasks, but block on joined tasks
- [x] test('saga fork wait for attached children')
  * parent task must wait for all forked tasks before terminating
- [x] test('saga auto cancel forks on error')
  * parent task must cancel all forked tasks when it aborts
- [x] test('saga auto cancel forks on main cancelled')
  * parent task must cancel all forked tasks when it's cancelled
- [x] test('saga auto cancel forks if a child aborts')
  * parent task must cancel all forked tasks when it aborts
- [x] test('saga auto cancel parent + forks if a child aborts')
  * parent task must cancel all forked tasks when it aborts
- [x] test('joining multiple tasks')
  * it must be possible to join on multiple tasks

### interpreter/forkJoinErrors.js
- [x] test('saga sync fork failures: functions')
  * NOTE: we'll be forking a function not a Generator
  * saga should fails the parent if a forked function fails synchronously
- [x] test('saga sync fork failures: functions/error bubbling')
  * NOTE: we'll be forking a function not a Generator
  * saga should propagate errors up to the root of fork tree
- [x] test('saga fork's failures: generators')
  * saga should fails the parent if a forked generator fails synchronously
- [x] test('saga sync fork failures: spawns (detached forks)')
  * saga should not fail a parent with errors from detached forks (using spawn)
- [x] test('saga detached forks failures')
  * saga should not fail a parent with errors from detached fork

### interpreter/race.js
- [x] test('saga race between effects handling')
  * saga must fulfill race between effects
- [x] test('saga race between array of effects handling')
  * saga must fulfill race between array of effects
- [x] test('saga race between effects: handle END')
  * saga must end Race Effect if one of the effects resolve with END
- [x] test('saga race between sync effects')
  * saga must not run effects when already completed
- [x] test('saga race cancelling joined tasks')

### interpreter/select.js
- [x] test('saga select/getState handling')
  * should resolve getState and select effects

### interpreter/all.js
- [x] test('saga parallel effects handling')
  * saga must fulfill parallel effects
- [x] test('saga empty array')
  * saga must fulfill empty parallel effects with an empty array
- [x] test('saga parallel effect: handling errors')
  * saga must catch the first error in parallel effects
- [x] test('saga parallel effect: handling END')
  * saga must end Parallel Effect if one of the effects resolve with END
- [x] test('saga parallel effect: named effects')
  * saga must handle parallel named effects

### interpreter/cancellation.js
- [x] test('saga cancellation: call effect')
  * cancelled call effect must throw exception inside called subroutine
- [x] test('saga cancellation: forked children')
  * cancelled main task must cancel all forked sub-tasks
- [x] test('saga cancellation: take effect')
  * cancelled take effect must stop waiting for action
- [x] test('saga cancellation: join effect (joining from a different task)')
  * cancelled task must cancel foreing joiners
- [x] test('saga cancellation: join effect (join from the same task's parent)')
  * cancelled routine must cancel proper joiners
- [x] test('saga cancellation: parallel effect')
  * cancelled parallel effect must cancel all sub-effects
- [x] test('saga cancellation: race effect')
  * cancelled race effect must cancel all sub-effects
- [x] test('saga cancellation: automatic parallel effect cancellation')
  * saga must cancel parallel sub-effects on rejection
- [x] test('saga cancellation: automatic race competitor cancellation')
  * saga must cancel race competitors except for the winner
- [x] test('saga cancellation:  manual task cancellation')
  * saga must cancel forked tasks
- [x] test('saga cancellation: nested task cancellation')
  * saga must cancel forked task and its nested subtask
- [x] test('saga cancellation: nested forked task cancellation')
  * saga must cancel forked task and its forked nested subtask
- [x] test('cancel should be able to cancel multiple tasks')
  * it must be possible to cancel multiple tasks at once
- [x] test('cancel should support for self cancellation')
  * it must be possible to trigger self cancellation
- [x] test('should bubble an exception thrown during cancellation')
- [x] test('task should end in cancelled state when joining cancelled child')
- [x] test('task should end in cancelled state when parent gets cancelled')

### interpreter/channel.js
- [x] test('saga create channel for store actions')
  * saga must queue dispatched actions
- [x] test('saga create channel for store actions (with buffer)')
  * saga must queue dispatched actions

### interpreter/flush.js
- [x] test('saga flush handling')
  * saga must handle generator flushes

### interpreter/context.js
- [x] test('saga must handle context in dynamic scoping manner')
  * saga must handle context in dynamic scoping manner

### interpreter/effectMiddlewares.js
- [x] test('effectMiddlewares - single')
  * effectMiddleware must be able to intercept and resolve effect in a custom way
- [x] test('effectMiddlewares - multiple')
  * multiple effectMiddlewares must create a chain
- [x] test('effectMiddlewares - nested task')
  * effectMiddleware must be able to intercept effects from non-root sagas

### interpreter/iterators.js
- [x] test('saga nested iterator handling')
  * saga must fulfill nested iterator effects

### interpreter/onerror.js
- [x] test('saga onError is optional (the default is console.error)')
  * saga does not blow up without onError
- [x] test('saga onError is called for uncaught error (thrown Error instance)')
  * saga passes thrown Error instance in onError handler
- [x] test('saga onError is called for uncaught error (thrown primitive)')
  * saga passes thrown primitive in onError handler
- [x] test('saga onError is not called for caught errors')
  * saga must not call onError
  * parent must catch error

### interpreter/promise.js
- [x] test('saga native promise handling')
  * saga should handle promise resolved/rejected values
- [x] test('saga native promise handling: undefined errors')
  * saga should throw if Promise rejected with an undefined error

### sagaHelpers/debounce.js
- [x] test('debounce: sync actions')
  * should debounce sync actions and pass the lastest action to a worker
- [x] test('debounce: async actions')
  * should debounce async actions and pass the lastest action to a worker
- [x] test('debounce: cancelled')
  * should not call a worker if cancelled before debounce limit is reached
- [x] test('debounce: channel')
  * should debounce actions from channel and pass the lastest action to a worker
- [x] test('debounce: channel END')
  * should finish debounce task on END
  * should not call function if finished with END
- [x] test('debounce: pattern END')
  * should finish debounce task on END
  * should not call function if finished with END
- [x] test('debounce: pattern END during race')
  * should interrupt race on END
  * should finish debounce task on END

### sagaHelpers/delay.js
- [x] test('delay')
  * setTimeout(resolve, ms, val)

### sagaHelpers/retry.js
- [x] test('retry failing')
  * should retry only for the defined number of times
  * should rethrow Error if failed more than the defined number of times
- [x] test('retry without failing')
  * should return a result of called function

### sagaHelpers/takeEvery.js
- [x] test('takeEvery')
  * takeEvery must fork a worker on each action
- [x] test('takeEvery: pattern END')
  * should finish takeEvery task on END
  * should not call function if finished with END

### sagaHelpers/takeLatest.js
- [x] test('takeLatest')
  * takeLatest must cancel current task before forking a new task
- [x] test('takeLatest: pattern END')
  * should finish takeLatest task on END
  * should not call function if finished with END

### sagaHelpers/takeLeading.js
- [x] test('takeLeading')
  * takeLeading must ignore new action and keep running task until the completion
- [x] test('takeLeading: pattern END')
  * should finish takeLeading task on END
  * should not call function if finished with END

### sagaHelpers/throttle.js
- [x] test('throttle')
  * throttle must ignore incoming actions during throttling interval
- [x] test('throttle: pattern END')
  * should finish throttle task on END
  * should not call function if finished with END

## /packages/testing-utils/__tests__

### cloneableGenerator.js
- [x] test('it should allow to "clone" the generator')

### createMockTask.js
- [x] test('should allow to use createMockTask for testing purposes')
