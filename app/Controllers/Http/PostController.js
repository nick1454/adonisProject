'use strict'

const Post = use('App/Models/Post')

class PostController
{
    async index({view})
    {
        const posts = await Post.all();
        const formURL = {
            name: 'create_post',
            params: {}
        };

        return view.render('welcome', {
            posts: (posts.toJSON()),
            formURL : (formURL)
        });
    }

    async create({request, response, session})
    {
        const post = new Post;

        post.title       = request.all().title;
        post.description = request.all().description;
        const saved = await post.save();

        if (saved)
            session.flash({ message: 'Post Submited'});
        else
            session.flash({ message: 'Unable to submit post'});

        return response.redirect('back');
    }

    async edit({view, params})
    {
        const posts = await Post.all();
        const post  = await Post.findOrFail(params.id);
        const formURL = {
            name : 'update_post',
            params: {id: post.id},
        };

        return view.render('welcome', {
            posts: (posts.toJSON()),
            selectedPost : (post.toJSON()),
            formURL : (formURL)
        });
    }

    async update({request, response, view, params, session})
    {
        const id = params.id;
        const post = await Post.findOrFail(id);
        let updated = false;

        post.title = request.all().title;
        post.description = request.all().description;
        updated = await post.save();

        if (updated)
            session.flash({ message: 'Post Updated.'});
        else
            session.flash({ message: 'Unable to update Post.'});

        return response.redirect('/');
    }

    async delete({response, session, params})
    {
        const id = params.id;
        const post = await Post.findOrFail(id);
        let deleted = await post.delete();

        if (deleted)
            session.flash({ message: 'Post Deleted.'});
        else
            session.flash({ message: 'Unable to Delete Post.'});

        return response.redirect('/');
    }
}

module.exports = PostController
