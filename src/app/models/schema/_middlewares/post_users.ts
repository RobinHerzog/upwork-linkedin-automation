class PostUsers {

  /**
   * Delete doc from other collections 'bookings'
   */
  afterUserDelete = function() {

    const moQuery1 = {user_id: this._id};

    this.model('bookingsMD').remove(moQuery1)
      .then((result: any) => {
        console.log('afterUserDelete:bookingsMD', result.deletedCount || 0);
        return result;
      });


  };



}


const post_users = new PostUsers();
export default post_users;

